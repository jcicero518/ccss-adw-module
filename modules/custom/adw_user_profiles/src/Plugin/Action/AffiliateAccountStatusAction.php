<?php

namespace Drupal\adw_user_profiles\Plugin\Action;

use Drupal\Core\Annotation\Action;
use Drupal\Core\Annotation\Translation;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\profile\Entity\Profile;
use Drupal\user\Entity\User;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\workflow\Plugin\Action\WorkflowStateActionBase;

/**
 * Class AffiliateAccountStatusAction
 * @package Drupal\adw_user_profiles\Plugin\Action
 *
 * @Action(
 *   id = "account_status_transition",
 *   label = @Translation("Account Status Transition"),
 *   type = "",
 *   confirm = TRUE
 * )
 */
class AffiliateAccountStatusAction extends WorkflowStateActionBase {

  /**
   * Checks object access.
   *
   * @param mixed $object
   *   The object to execute the action on.
   * @param \Drupal\Core\Session\AccountInterface $account
   *   (optional) The user for which to check access, or NULL to check access
   *   for the current user. Defaults to NULL.
   * @param bool $return_as_object
   *   (optional) Defaults to FALSE.
   *
   * @return bool|\Drupal\Core\Access\AccessResultInterface
   *   The access result. Returns a boolean if $return_as_object is FALSE (this
   *   is the default) and otherwise an AccessResultInterface object.
   *   When a boolean is returned, the result of AccessInterface::isAllowed() is
   *   returned, i.e. TRUE means access is explicitly allowed, FALSE means
   *   access is either explicitly forbidden or "no opinion".
   */
  public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {

    return TRUE;
  }

  public function calculateDependencies() {
    return [
      'module' => ['workflow', 'profile']
    ];
  }

  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);
    return $form;
  }

  /**
   * @param null $entity
   * @return \Drupal\Core\StringTranslation\TranslatableMarkup
   */
  public function execute($entity = NULL) {
    if ($entity instanceof User) {
      $uid = $entity->id();
      $profile = Profile::load($uid);

      if (!$transition = $this->getTransitionForExecution($profile)) {
        $this->messenger()->addStatus('The entity is not valid for this action.');
        return;
      }
      workflow_execute_transition($transition, FALSE);
    }

    return $this->t('??');
  }
}
