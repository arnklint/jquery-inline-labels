/**
 * jQuery.labelize - Move labels inside input fields
 * Jonas Arnklint, http://starksignal.com
 * Released into the public domain
 * Date: 15th January 2009
 * @author Jonas Arnklint
 * @version 1.0
 *
 *
 * Basic calling syntax: $("input").labelize();
 * The only option in use: $("input").labelize({ labelledClass: 'labeled_field' });
 * Defaults to taking the in-field label from the field's title attribute
 *
 * The only setting is optional and goes by the name of: 
 *
 *   labelledClass
 *     a class that will be applied to the input field when it contains the
 *      label and removed when it contains user input. Defaults to 'labeled'.
 *  
 */
jQuery.fn.labelize = function(settings) {
	settings = jQuery.extend({
		labelledClass: "labeled"
	}, settings);

  var lookup = function(input){
		return $("label[for=" + input.id +"]").hide().text();
	};
	
  var jQuery_labellized_elements = $(this);
  return $(this).each(function() {		
    // strip newlines because the browser strips them when you set textbox.value to a string containing them
    $(this).data("label",lookup(this).replace(/\n/g,''));
    $(this).focus(function() {
      if (this.value === $(this).data("label")) {
        this.value = this.defaultValue;
        $(this).removeClass(settings.labelledClass);
      }
    }).blur(function(){
      if (this.value === this.defaultValue) {
        this.value = $(this).data("label");
        $(this).addClass(settings.labelledClass);
      }
    });
    
    var removeValuesOnExit = function() {
      jQuery_labellized_elements.each(function(){
        if (this.value === $(this).data("label")) {
          this.value = this.defaultValue;
          $(this).removeClass(settings.labelledClass);
        }
      })
    };
    
    $(this).parents("form").submit(removeValuesOnExit);
    $(window).unload(removeValuesOnExit);
    
    if (this.value !== this.defaultValue) {
      // don't overwrite when user has started typing
      return;
    }
    // set the value
    this.value = $(this).data("label");
    $(this).addClass(settings.labelledClass);

  });
};