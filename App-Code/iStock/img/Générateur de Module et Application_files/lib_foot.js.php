
/* JS CODE TO ENABLE Tooltips on all object with class classfortooltip */
jQuery(document).ready(function () {
jQuery(".classfortooltip").tooltip({
				show: { collision: "flipfit", effect:'toggle', delay:50 },
				hide: { delay: 250 },
				tooltipClass: "mytooltip",
				content: function () {
                    console.log("Return title for popup");
            		return $(this).prop('title');		/* To force to get title as is */
          		}
			});

jQuery(".classfortooltiponclicktext").dialog(
    { closeOnEscape: true, classes: { "ui-dialog": "highlight" },
    maxHeight: window.innerHeight-60, width: 700,
    modal: true,
    autoOpen: false }).css("z-index: 5000");
jQuery(".classfortooltiponclick").click(function () {
    console.log("We click on tooltip for element with dolid="+$(this).attr('dolid'));
    if ($(this).attr('dolid'))
    {
        obj=$("#idfortooltiponclick_"+$(this).attr('dolid'));		/* obj is a div component */
        obj.dialog("open");
		return false;
    }
});
});

/* JS CODE TO ENABLE dropdown */

                jQuery(document).ready(function () {
                  $(".dropdown dt a").on('click', function () {
                  	  console.log("We click on dropdown");
                      //console.log($(this).parent().parent().find('dd ul'));
                      $(this).parent().parent().find('dd ul').slideToggle('fast');
                      // Note: Did not find a way to get exact height (value is update at exit) so i calculate a generic from nb of lines
                      heigthofcontent = 21 * $(this).parent().parent().find('dd div ul li').length;
                      if (heigthofcontent > 300) heigthofcontent = 300; // limited by max-height on css .dropdown dd ul
                      posbottom = $(this).parent().parent().find('dd').offset().top + heigthofcontent + 8;
                      var scrollBottom = $(window).scrollTop() + $(window).height();
                      diffoutsidebottom = (posbottom - scrollBottom);
                      console.log("heigthofcontent="+heigthofcontent+", diffoutsidebottom (posbottom="+posbottom+" - scrollBottom="+scrollBottom+") = "+diffoutsidebottom);
                      if (diffoutsidebottom > 0)
                      {
                            pix = "-"+(diffoutsidebottom+8)+"px";
                            console.log("We reposition top by "+pix);
                            $(this).parent().parent().find('dd').css("top", pix);
                      }
                      // $(".dropdown dd ul").slideToggle('fast');
                  });
                  $(".dropdowncloseonclick").on('click', function () {
                     console.log("Link has class dropdowncloseonclick, so we close/hide the popup ul");
                     $(this).parent().parent().hide();
                  });

                  $(document).bind('click', function (e) {
                      //console.log("We click outside of dropdown, so we close it.");
                      var $clicked = $(e.target);
                      if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
                  });
                });
           
/* JS CODE TO ENABLE document_preview */

                jQuery(document).ready(function () {
			        jQuery(".documentpreview").click(function () {
            		    console.log("We click on preview for element with href="+$(this).attr('href')+" mime="+$(this).attr('mime'));
            		    document_preview($(this).attr('href'), $(this).attr('mime'), 'Aperçu');
                		return false;
        			});
        		});
           

/* JS CODE TO ENABLE reposition management (does not work if a redirect is done after action of submission) */

			jQuery(document).ready(function() {
				/* If page_y set, we set scollbar with it */
				page_y=getParameterByName('page_y', 0);				/* search in GET parameter */
				if (page_y == 0) page_y = jQuery("#page_y").text();		/* search in POST parameter that is filed at bottom of page */
				if (page_y > 0)
				{
					console.log("page_y found is "+page_y);
					$('html, body').scrollTop(page_y);
				}

				/* Set handler to add page_y param on output (click on href links or submit button) */
				jQuery(".reposition").click(function() {
					var page_y = $(document).scrollTop();

					if (page_y > 0)
					{
						if (this.href)
						{
							this.href=this.href+'&page_y='+page_y;
							console.log("We click on tag with .reposition class. this.ref is now "+this.href);
						}
						else
						{
							console.log("We click on tag with .reposition class but element is not an <a> html tag, so we try to update input form field with name=page_y with value "+page_y);
							jQuery("input[type=hidden][name=page_y]").val(page_y);
						}
					}
				});
			});
