<?php

namespace Drupal\adw_user_profiles\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Entity\EntityFormBuilderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\adw_user_profiles\AffiliateProfileForm;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Session\SessionManagerInterface;

/**
 * Class UserProfileController.
 */
class UserProfileController extends ControllerBase {

  const PROFILE_TYPE = 'affiliate';

  protected $config_factory;

  protected $formBuilder;

  protected $affiliateProfileForm;

  protected $session;

  final public function __construct(ConfigFactory $configFactory, AffiliateProfileForm $affiliate_profile_form, SessionManagerInterface $session) {
    $this->config_factory = $configFactory;
    $this->affiliateProfileForm = $affiliate_profile_form;
    $this->session = $session;

  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('adw_user_profiles.affiliate_form'),
      $container->get('session_manager')
    );
  }

  /**
   * Controller method for /become-a-ccss-affiliate-now path, now bound to
   * a route name of adw_user_profiles.affiliate_redirect
   *
   * If user is anonymous, send to SAML login if SimpleSamlPhp module is enabled
   * If user is logged in and is "SAML capable" - they have a role of affiliate or just authenticated_user - send to profile
   *
   * @return RedirectResponse
   */
  public function redirectUser() : RedirectResponse {
    $noRedirectRoles = [
      'administrator',
      'client_admin'
    ];

    \Drupal::service('page_cache_kill_switch')->trigger();

    if ($this->currentUser()->isAnonymous()) {
      if ($this->moduleHandler()->moduleExists('simplesamlphp_auth')) {
        return $this->redirect('simplesamlphp_auth.saml_login')->send();
      } else {
        return $this->redirect('user.login')->send();
      }

    } else if ($this->currentUser()->isAuthenticated() && !array_intersect($noRedirectRoles, $this->currentUser()->getRoles())) {
      return $this->redirect('profile.user_page.single', ['profile_type' => self::PROFILE_TYPE, 'user' => $this->currentUser()->id()])->send();
    }

    return $this->redirect('user.login')->send();
  }

  public function getAffiliateProfile() {

    $userEntity = $this->affiliateProfileForm->getUserEntity();
    $profile = $this->affiliateProfileForm->loadProfileByUser($userEntity, 'affiliate');

    if ($profile) {
      // return $this->entityFormBuilder()->getForm($profile, 'edit');
    }

    if ($this->currentUser()->isAuthenticated()) {
      RedirectResponse::create('/user/' . $this->currentUser()->id() . '/affiliate')->send();
      exit;
    }

    RedirectResponse::create('/', 301)->send();
    exit;

  }

}
