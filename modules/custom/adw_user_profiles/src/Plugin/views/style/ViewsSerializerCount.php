<?php

namespace Drupal\adw_user_profiles\Plugin\views\style;

use Drupal\Core\Annotation\Translation;
use Drupal\rest\Plugin\views\style\Serializer;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Cache\CacheableDependencyInterface;
use Drupal\views\Annotation\ViewsStyle;

/**
 * Class ViewsSerializerCount
 * @package Drupal\adw_user_profiles\Plugin\views\style
 *
 * @ViewsStyle(
 *     id = "serializer_count",
 *     title = @Translation("Serializer with count"),
 *     help = @Translation("Serializes views row data using the Serializer component and adds pagination counts."),
 *     display_types = {"data"}
 * )
 */
class ViewsSerializerCount extends Serializer {

  public function render() {
    $query_items_per_page = \Drupal::request()->get('items_per_page');
    $rows = [];
    $count = $this->view->pager->getTotalItems();
    $items_per_page = $this->view->pager->options['items_per_page'];
    $pages = ceil($count / $items_per_page);
    $current_page = $this->view->pager->getCurrentPage();

    // If the Data Entity row plugin is used, this will be an array of entities which
    // will pass through Serializer to one of the registered Normalizers,
    // which will transform it to arrays/scalars.
    // If the Data field row plugin is used, $rows will not contain objects
    // and will pass directly to the Encoder
    foreach ($this->view->result as $row_index => $row) {
      $this->view->row_index = $row_index;
      $rows[] = $this->view->rowPlugin->render($row);
    }
    unset($this->view->row_index);

    // Get the content type configured in the display or fallback to the default.

    if ((empty($this->view->live_preview))) {
      // TODO: From drupal-check: Call to an undefined method
      //         Drupal\views\Plugin\views\display\DisplayPluginBase::getContentType()
      $content_type = $this->displayHandler->getContentType();
    } else {
      $content_type = !empty($this->options['formats']) ? reset($this->options['formats']) : 'json';
    }

    return $this->serializer->serialize(
      [
        'results' => $rows,
        'count' => $count,
        'pager' => [
          'count' => $count,
          'pages' => $pages,
          'items_per_page' => $items_per_page,
          'current_page' => $current_page
        ]
      ], $content_type);

  }
}
