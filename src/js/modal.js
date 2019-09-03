// class Modal {
//     constructor(modal) {
//         this.modal = modal;
//         this.overlay = this.overlay.bind(this);
//         this.overlay();
//     }

//   overlay() {
//         this.modal.wrap('<div class="overlay"></div>');
//     }

// }



// $(".modal").each(function () {
//     $(this).wrap('<div class="overlay"></div>')
// });

// $(".open-modal").on('click', function (e) {
//     e.preventDefault();
//     e.stopImmediatePropagation;

//     var $this = $(this),
//         modal = $($this).data("modal");

//     $(modal).parents(".overlay").addClass("open");
//     setTimeout(function () {
//         $(modal).addClass("open");
//     }, 350);

//     $(document).on('click', function (e) {
//         var target = $(e.target);

//         if ($(target).hasClass("overlay")) {
//             $(target).find(".modal").each(function () {
//                 $(this).removeClass("open");
//             });
//             setTimeout(function () {
//                 $(target).removeClass("open");
//             }, 350);
//         }

//     });

// });

// $(".close-modal").on('click', function (e) {
//     e.preventDefault();
//     e.stopImmediatePropagation;

//     var $this = $(this),
//         modal = $($this).data("modal");

//     $(modal).removeClass("open");
//     setTimeout(function () {
//         $(modal).parents(".overlay").removeClass("open");
//     }, 350);

// });

export default Modal;