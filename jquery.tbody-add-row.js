/**
   * tbodyAddRow
   *
   * Version 1.0.0
   * Godat Design/Richard Whitmer
   * http://godatdesign.com
   * tbodyAddRow
   * @memberOf jQuery.fn
   * jQuery plugin for adding rows to a table body
   
   Usage:
   $('tbody').addRow();
   
*/
(function($){
 
    $.fn.extend({
    

        //Pass options variable to the function
        addRow: function(options) {
 
            //Set the default values
            var defaults = {
                addClass:  false,			// Class table element containing example row
                rowHtml:	false,				
                dropClass:	'.drop-row',	// Clickable class for dropping parent row
                clickToAdd: '.add-row',		// Clickable element to add row
                callback: function(){}		// Callback
            }

            var options =  $.extend(defaults, options);
            
            options.rowHtml = '<tr>' + $('tbody').children().last('tr').html() + '</tr>';

			/** Trigger callback function
			 * @return void
			 */
			triggerCallback = function()
			{
				if(typeof options.callback=='function') {
					options.callback.call(this);
				}
			}

		
			/** Add the new row
			 * @return callback
			 */
			addNewRow = function(){

				addRowHtml = options.rowHtml+"\n";

				if(options.addClass===false){
					if($('tbody').append(addRowHtml)){
						return triggerCallback();
					}
				}else{
					if($($('tbody').children().last(options.addClass)).after(addRowHtml)){
						return triggerCallback();
					}
				}
			}

			
			/** toggle display of element if less than given min
			 * @param int
			 * @param string
			 */
			toggleDropRowLink = function(min)
			{
				if($(options.dropClass).length<(min+1)){
					$(options.dropClass).hide();	
				} else {
					$(options.dropClass).show();
				}
			}

			
			/** Remove the parent tr element
			 *	@return void
			 */
			dropRow = function()
			{
				$(options.dropClass).on('click',function(){
					$(this).parents('tr').first().remove();
					toggleDropLink();
				});
			}
			
			/** How many drop links are there?
			 *	@return int
			 */
			 dropLinkCount = function(){
			 	return $(options.dropClass).length;
			 }
			 
			 
			 /*	Toggle drop row link depending on how many rows there are
			  *	@return void
			  */
			  toggleDropLink = function(){
			  	if(dropLinkCount()<2){
						$(options.dropClass).css({display:'none'});
					} else {
						$(options.dropClass).css({display:'block'});
				}	
			  }


			/* If row html wasn't passed in options, get it from the last row when the page loads */
			if(options.rowHtml===false){
			
				/* If addClass not passed in options, use the last row in the table body */
				if(options.addClass===false){
					options.rowHtml = $('tbody').children().last('tr').html();
				
					} else {
					options.rowHtml = $(options.addClass).html();
				}
			}
			
			/* Let's go...*/

				$(options.clickToAdd).on('click',function(){
					addNewRow();
					dropRow();
					toggleDropLink();
				});
        }
    
       });
     
})(jQuery);
