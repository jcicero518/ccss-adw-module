<?php

namespace Drupal\adw_user_profiles\Tests;

use Drupal\simpletest\WebTestBase;

/**
 * Provides automated tests for the adw_user_profiles module.
 */
class UserProfileControllerTest extends WebTestBase {


  /**
   * {@inheritdoc}
   */
  public static function getInfo() {
    return [
      'name' => "adw_user_profiles UserProfileController's controller functionality",
      'description' => 'Test Unit for module adw_user_profiles and controller UserProfileController.',
      'group' => 'Other',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();
  }

  /**
   * Tests adw_user_profiles functionality.
   */
  public function testUserProfileController() {
    // Check that the basic functions of module adw_user_profiles.
    $this->assertEquals(TRUE, TRUE, 'Test Unit Generated via Drupal Console.');
  }

}
