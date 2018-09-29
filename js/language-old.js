$('.language-selectbox').on('click', function(event) {
    $('.insert-language').append(`
            <div class="resume-form-row">
               <div class="bloko-column bloko-column_xs-4 bloko-column_s-3 bloko-column_m-3 bloko-column_l-3 bloko-column_container">
                  <div class="HH-Resume-Languages-Label">
                     <div class="bloko-column bloko-column_xs-0 bloko-column_s-8 bloko-column_m-3 bloko-column_l-3" style="padding-left: 0;">
                        <div class="bloko-form-item"><label class="bloko-form-legend ">დამატებითი ენები</label></div>
                     </div>
                     <div class="bloko-column bloko-column_xs-4 bloko-column_s-0 bloko-column_m-0 bloko-column_l-0"><label class="resume-short-label">დამატებითი ენები</label></div>
                  </div>
               </div>
         
               <div class="resume-remove-item-wrapper resume-remove-item-wrapper_language">
                  <div class="bloko-column bloko-column_xs-4 bloko-column_s-6 bloko-column_m-6 bloko-column_l-6">
                     <div class="resume-remove-item-gap">
                        <div class="bloko-control-group">
                           <div class="bloko-control-group__content-sized">
                              <div class="resume-language-select">
                                 <div class="HH-Resume-LanguageSelect-Select bloko-custom-select">
                                    <select class="bloko-select Bloko-CustomSelect-NativeSelect HH-Resume-Languages-Id g-hidden" name="language.id">
                                       <option value="1">ქართული</option>
                                       <option value="2">ინგლისური</option>
                                       <option value="3">რუსული</option>
                                       <option value="4">გერმანული</option>
                                    </select>
                                    <div class="bloko-custom-select__select Bloko-CustomSelect main-language" >
                                       <span class="bloko-custom-select__placeholder Bloko-CustomSelect-Selected">
                                       ინგლისური
                                       </span>
                                    </div>
         
                                    <div class="bloko-custom-select__content Bloko-CustomSelect-OptionsContainer bloko-custom-select__content_layer-above-content language-section" style="display: none;">
                                       <div class="bloko-custom-select__search Bloko-CustomSelect-SearchContainer">
                                          <label class="bloko-input-wrapper">
                                          <input class="bloko-input Bloko-CustomSelect-Search" placeholder="" type="text">
                                          <span class="bloko-icon bloko-icon_search"></span>
                                          </label>
                                       </div>
                                       <div class="bloko-custom-select__option-list Bloko-CustomSelect-Options">
                                          <div class="bloko-select-dropdown-option Bloko-CustomSelect-OptionItem bloko-select-dropdown-option_selected">
                                             <span >
                                             ქართული
                                             </span>
                                          </div>
                                          <div class="bloko-select-dropdown-option Bloko-CustomSelect-OptionItem bloko-select-dropdown-option_focused">
                                             <span >
                                             ინგლისური
                                             </span>
                                          </div>
                                          <div class="bloko-select-dropdown-option Bloko-CustomSelect-OptionItem">
                                             <span >
                                             რუსული
                                             </span>
                                             <div class="resume-language-select-separator"></div>
                                          </div>
                                          <div class="bloko-select-dropdown-option Bloko-CustomSelect-OptionItem">
                                             <span >
                                             გერმანული
                                             </span>
                                          </div>
         
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="resume-language-break">
                              <div class="bloko-form-item"></div>
                           </div>
         
                           <div class="bloko-control-group__content-sized">
                              <div class="resume-language-level-select resume-language-level-select_short">
                                 <input type="hidden" name="language.degree" class="HH-Resume-Languages-Degree" value="basic" data-qa="resume-language-level-input">
                                 <select class="bloko-select HH-Resume-Languages-Degree-Select HH-AutoSave-WithoutName" data-hh-autosave-without-name="language-degree" data-qa="resume-language-level-select">
                                    <option value="basic" selected="">დამწყები</option>
                                    <option value="can_read">საშუალო</option>
                                    <option value="can_pass_interview">კარგად</option>
                                    <option value="fluent">პროფესიონალი </option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="resume-remove-item ">
                     <div class="resume-remove-item__button HH-Form-Element-Remove"><span class="bloko-icon-dynamic"><span class="bloko-icon-link HH-Form-Element-RemoveLink" data-qa="resume-remove-item"><span class="bloko-icon                                      bloko-icon_cancel                                      bloko-icon_initial-impact                                      bloko-icon_highlighted-tertiary"></span></span></span></div>
                     <span class="g-hidden HH-Form-Element-RemoveText"></span>
                  </div>
               </div>
         
            </div>
                  `);
});

$(document).on('click', '.main-language ', function() {

    $(this).siblings('.language-section').toggleClass('active');
    $('.Bloko-CustomSelect-Search').val('');

});
$(document).on('click', '.language-section .bloko-select-dropdown-option', function() {

    $(this).addClass('bloko-select-dropdown-option_focused').siblings().removeClass('bloko-select-dropdown-option_focused');
    var lang = $(this).text();
    $(this).parent().parent().removeClass('active');
    $(this).parent().parent().siblings('.main-language').html('<span class="bloko-custom-select__placeholder Bloko-CustomSelect-Selected">'+lang+'</span>');

});
$(document).on('click', function (event) {
    if ($(event.target).closest('.main-language').length) {
        $(document).on('click', '.language-section ', function() {
            return false;
        });

    }else {
        $('.language-section').removeClass('active');
    }
});

$(document).on('keyup', '.Bloko-CustomSelect-Search', function() {

    var value = $(this).val().toLowerCase();


    $(".Bloko-CustomSelect-Options .bloko-select-dropdown-option").filter(function() {



        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);

    });

});