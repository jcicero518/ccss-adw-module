<?php

namespace Drupal\adw_user_profiles\Form;

use Drupal\Console\Bootstrap\Drupal;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\field\Entity\FieldConfig;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\migrate\Plugin\migrate\process\Explode;

/**
 * Class UserProfileConfigForm.
 */
class UserProfileConfigForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'adw_user_profiles.userprofileconfig',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'adw_user_profile_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('adw_user_profiles.userprofileconfig');

    $textarea_description = $this->t('<div class="description"><p><strong>Enter one value per line, in the format key|label.</strong></p></div>');

    $form['ranks_container'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => [
          'layout-column',
          'layout-column--half'
        ]
      ]
    ];

    $form['ranks_container']['rank'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Rank'),
      '#description' => $textarea_description,
      '#default_value' => $config->get('rank'),
      '#rows' => 10,
      '#cols' => 1,
      '#resizable' => TRUE
    ];

    $form['clearfix'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => [
        'class' => [
          'clearfix'
        ]
      ],
      '#value' => ' '
    ];

    $form['ranks_container']['department'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Departments'),
      '#description' => $textarea_description,
      '#default_value' => $config->get('department'),
      '#rows' => 10,
      '#cols' => 1,
      '#resizable' => TRUE
    ];

    $form['clearfix'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => [
        'class' => [
          'clearfix'
        ]
      ],
      '#value' => ' '
    ];

    $form['ranks_container']['center_affiliations'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Center Affiliations'),
      '#description' => $textarea_description,
      '#default_value' => $config->get('center_affiliations'),
      '#rows' => 10,
      '#cols' => 1,
      '#resizable' => TRUE
    ];

    $form['clearfix'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => [
        'class' => [
          'clearfix'
        ]
      ],
      '#value' => ' '
    ];

    $form['ranks_container']['research_interests'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Research Interests'),
      '#description' => $textarea_description,
      '#default_value' => $config->get('research_interests'),
      '#rows' => 10,
      '#cols' => 1,
      '#resizable' => TRUE
    ];

    $form['clearfix'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => [
        'class' => [
          'clearfix'
        ]
      ],
      '#value' => ' '
    ];

    $form['ranks_container']['research_approach'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Research Approach'),
      '#description' => $textarea_description,
      '#default_value' => $config->get('research_approach'),
      '#rows' => 10,
      '#cols' => 1,
      '#resizable' => TRUE
    ];

    $form['clearfix_2'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => [
        'class' => [
          'clearfix'
        ]
      ],
      '#value' => ' '
    ];

    $form['ranks_container']['fields_of_expertise'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Fields of Expertise'),
      '#description' => $textarea_description,
      '#default_value' => $config->get('fields_of_expertise'),
      '#rows' => 10,
      '#cols' => 1,
      '#resizable' => TRUE
    ];

    $form['clearfix_2'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => [
        'class' => [
          'clearfix'
        ]
      ],
      '#value' => ' '
    ];

    /*$form['description'] = [
      '#type' => 'item',
      '#title' => '',
      '#markup' => t('Enter one value per line, in the format key|label.')
    ];*/

    // $deptFieldStorage = FieldConfig::load('user.user.field_department')->getFieldStorageDefinition();
    // $deptAllowedValues = $deptFieldStorage->getSetting('allowed_values');

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('adw_user_profiles.userprofileconfig')
      ->set('rank', $form_state->getValue('rank'))
      ->set('department', $form_state->getValue('department'))
      ->set('center_affiliations', $form_state->getValue('center_affiliations'))
      ->set('research_interests', $form_state->getValue('research_interests'))
      ->set('research_approach', $form_state->getValue('research_approach'))
      ->set('fields_of_expertise', $form_state->getValue('fields_of_expertise'))
      ->save();
  }

}
