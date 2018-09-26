// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery
//= require_tree .

const MAX_FILE_SIZE = 4000;
const ACCEPTED_FILE_TYPES = ['template1', 'template2'];

let validations = () => {
    let photoUpload = document.getElementById('user_avatar').files
    alert(photoUpload.length + ' - ' + photoUpload[0].size);
    if(photoUpload.length > 0) {
        valFileSize(photoUpload);
        // valIfPhoto(photoUpload);
    }
};

let valFileSize = (photo) => {
        if(photo[0].size > MAX_FILE_SIZE) {
            alert('File is too big, please use a photo with size below 4MB');
            event.preventDefault();
            event.stopPropagation();
        }
};

let valIfPhoto = (photo) => {
        if(photo[0].size > MAX_FILE_SIZE) {
            alert('File size is too large');
            event.preventDefault();
            event.stopPropagation();
        }
};

window.addEventListener('turbolinks:load', () => {
    let forms = document.getElementById('edit_user');
    if(typeof(forms) != 'undefined' && forms != null) {
        forms.addEventListener('submit', validations);
    }
});

$(document).ready(function() {
  $(document).on('timeline_reload', function() {
    Rails.ajax({
      dataType: 'html',
      type: 'GET',
      url: '/timeline/render',
    })
  });
});

$(document).ready(function() {
  let page = 1;
  $(document).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
     Rails.ajax({
      dataType: 'html',
      type: 'GET',
      url: '/timeline/loadmore/' + page,
      success: function() {
        console.log("deu bom");
        page += 1;
      }
     })
    }
  });
});
