(function ($, Drupal) {
  Drupal.behaviors.activityStatusPreview = {
    attach: function (context) {
      const $date = $('input[name="field_date[0][value][date]"]', context);
      const $time = $('input[name="field_date[0][value][time]"]', context);
      const $status = $('select[name="moderation_state"], select[name="field_status"]', context)
        .first();

      if (!$status.length) return;

      const THRESHOLD_MIN = 10;

      function parseSelectedDate() {
        const d = $date.val();
        const t = $time.val();
        if (!d || !t) return null;
        // Nutze lokale Zeit des Browsers – reine Vorschau.
        const dt = new Date(`${d}T${t}`);
        return isNaN(dt.getTime()) ? null : dt;
      }

      function updatePreview() {
        const sel = parseSelectedDate();
        if (!sel) return;
        const now = new Date();
        const diffMin = (sel - now) / 60000;

        const pendingOption = $status.find('option[value="pending"]').length ? 'pending' : null;
        const doneOption = $status.find('option[value="done"]').length ? 'done' : null;

        if (diffMin > THRESHOLD_MIN && pendingOption) {
          $status.val(pendingOption).trigger('change');
        } else if (doneOption) {
          $status.val(doneOption).trigger('change');
        }
      }

      $date.once('activityStatusPreview').on('change input', updatePreview);
      $time.once('activityStatusPreview').on('change input', updatePreview);
    }
  };
})(jQuery, Drupal);
