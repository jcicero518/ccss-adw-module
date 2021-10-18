<?php

namespace Drupal\adw_user_profiles;

use Drupal\Core\Entity\EntityFormBuilderInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\user\Entity\User;

class AffiliateProfileForm {

  /**
   * @var EntityTypeManagerInterface $entityTypeManager
   */
  protected $entityTypeManager;

  /**
   * @var AccountProxyInterface $account
   */
  protected $account;

  protected $entityFormBuilder;

  /**
   * AffiliateProfileForm constructor.
   * @param EntityTypeManagerInterface $entityTypeManager
   * @param AccountProxyInterface $accountProxy
   * @param EntityFormBuilderInterface $entityFormBuilder
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager, AccountProxyInterface $accountProxy, EntityFormBuilderInterface $entityFormBuilder) {
    $this->entityTypeManager = $entityTypeManager;
    $this->account = $accountProxy;
    $this->entityFormBuilder = $entityFormBuilder;
  }

  /**
   * @return \Drupal\Core\Entity\EntityInterface|null
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getUserEntity() {
      return $this->entityTypeManager
        ->getStorage('user')
        ->load($this->account->id());
  }

  /**
   * @param User $user
   * @param $profile_type
   * @return mixed
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function loadProfileByUser(User $user, $profile_type) {
    $profileStorage = $this->entityTypeManager
      ->getStorage('profile');
    return $profileStorage->loadByUser($user, $profile_type);
  }

  public function buildForm() {
    $userEntity = $this->getUserEntity();

    $profileStorage = $this->entityTypeManager
      ->getStorage('profile');

    $profile = $profileStorage->loadByUser($userEntity, 'affiliate');

    return $this->entityFormBuilder->getForm($profile, 'edit');

  }

}
