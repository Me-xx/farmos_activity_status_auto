# farmos_activity_status_auto
Enables a auto activity status that changes during "save" procedure to done or pending depending on the current date/time and acitvity date/time.

# Activity Status Enforcer

A custom farmOS/Drupal module that introduces an **`auto` status** option for logs.  
When set to `auto`, the status is automatically determined at save time based on the log’s date:

- **Future (> 10 minutes)** → `pending`  
- **Now or past (≤ 10 minutes)** → `done`  
- **Explicit user choice (`pending` or `done`)** → respected, not overridden  

---

## 📂 Installation

1. **Create the module folder**

   ```bash
   mkdir -p web/modules/custom/activity_status_enforcer
## 2. Add the required files

Inside your custom module folder, create the following files:

- `activity_status_enforcer.info.yml`  
- `activity_status_enforcer.module`  
- *(optional)* `config/install/*.yml` for default settings  
- *(optional)* `activity_status_enforcer.libraries.yml`  
- *(optional)* `js/status-preview.js` for live form feedback  

---

## 3. Adjust configuration

If your **status field** or **log bundle** has a different name, update it either:

- in the YAML config, or  
- directly in the PHP code.  

---

## 4. Clear the cache

Run the following command:

drush cr

## 5. Enable the module

Enable the module with Drush:
drush en activity_status_enforcer -y


## 6. (Optional) Enable form UX enhancements

If you want live feedback in the form (status auto-switching before save):

    Attach the JavaScript library in your form_alter hook.

    Register the library in activity_status_enforcer.libraries.yml.

    Place your JS logic in js/status-preview.js.


<?php

use Drupal\Core\Form\FormStateInterface;

function activity_status_enforcer_form_log_form_alter(array &$form, FormStateInterface $form_state, $form_id) {
  // Für spezifische Bundles filtern, z. B. 'activity'.
  if (!empty($form['#bundle']) && $form['#bundle'] === 'activity') {
    $form['#attached']['library'][] = 'activity_status_enforcer/status_preview';
  }
}
