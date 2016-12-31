<?php

/*
Controller name: Menu
Controller description: Menu API
*/

class JSON_API_Menu_Controller {

    //https://github.com/mcnasby/wp-json-api-menu-controller/blob/master/api-controllers/menus.php
    public function get_menu() {
        global $json_api;
        $menuItems = null;
        $menuLocation = null;
        $menuId = null;

        // Make sure we have key/value query vars
        if ($json_api->query->menu_id || $json_api->query->menu_location) {
            if ($json_api->query->menu_id) {
                $menuId = $json_api->query->menu_id;
                $menuLocation = '';
                $menuItems = $this->get_nav_items($menuId);

            } else if ($json_api->query->menu_location) {
                $menuLocation = $json_api->query->menu_location;
                $menus = wp_get_nav_menus();
                $menuLocations = get_nav_menu_locations();
                if (isset($menuLocations[$menuLocation])) {
                    foreach ($menus as $menu) {
                        // If the ID of this menu is the ID associated with the location we're searching for
                        if ($menu->term_id == $menuLocations[$menuLocation]) {
                            // This is the correct menu
                            $menuId = $menu->slug;
                            //var_dump($menu->slug);
                            // Get the items for this menu
                            $menuItems = $this->get_nav_items($menuId);
                            break;
                        } else if ($menu->term_id != $menuLocations[$menuLocation]) {
                            $json_api->error('There are no menus set for this location.');
                        }
                    }
                } else {
                    $json_api->error('Menu location: \'' . $menuLocation . '\' does not exist');
                }
            }
            return array(
                'count' => $menuItems['count'],
                'menu_location' => $menuLocation,
                'menu_id' => $menuId,
                'menu' => $menuItems['output']
            );
        } else {
            $json_api->error('Include the parameter \'menu_id\' with an appropriate string value.');
            return false;
        }
    }

    private function get_nav_items($id) {
        global $json_api;
        $menuOutput = wp_get_nav_menu_items($id);
        $filteredItems = array_map(function($element){
            $filter = array(
                'id'=>$element->ID,
                'parent_id'=>$element->menu_item_parent,
                'menu_order'=>$element->menu_order,
                'label'=>$element->title,
                'object_type'=>$element->object,
                'object_id'=>($element->object == 'custom'?'':$element->object_id),
                'url'=>($element->object == 'custom'?$element->url:'')
            );
            return $filter;
        }, $menuOutput);
        $output = ($json_api->query->dev == '1'?$menuOutput:$filteredItems);
        $count = count($output);
        if ($count == '0') {
            $json_api->error('The menu you are looking for is empty or does not exist.');
            return false;
        } else {
            return array(
                'output' => $output,
                'count' => $count
            );
        }
    }

}
