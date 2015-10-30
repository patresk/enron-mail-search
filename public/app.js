(function($) {

  var list = $('.list');

  var values = {
    text: '',
    searchRaw: false,
    name1: '',
    name2: '',
    dateFrom: '',
    dateTo: ''
  };

  function search() {
    $.ajax('/search', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(values)
    }).done(draw);
  }

  function draw(data) {
    list.empty();
    if (data.length) {
      list.append(data.map(function(item) {
        return (
        '<li class=\'item\'>' +
          '<div class=\'item_head\'>' +
          '<strong>Subject: </strong>' + item._source.subject + '<br>' +
          '<strong>From: </strong>' + item._source.from + '<br>' +
          '<strong>To: </strong>' + item._source.to + '<br>' +
          '<strong>Date: </strong>' + item._source.date + '<br><br>' +
          '' + (item.highlight ? item.highlight.content : item._source.content) +
          '</div>' +
        '</li>');
      }).join(''));
    }
  }

  $('[js-text]').on('keyup', function() {
    values.text = $(this).val();
    search();
  });

  $('[js-name-1]').on('keyup', function(e) {
    values.name1 = $(this).val();
    search();
  })

  $('[js-name-2]').on('keyup', function() {
    values.name2 = $(this).val();
    search();
  });

  $.fn.datepicker.defaults.defaultViewDate = { year: 2001, month: 0, day: 1};

  $('[js-datepicker-1]').datepicker().on('changeDate', function(e) {
    values.dateFrom = e.date;
    search();
  });

  $('[js-datepicker-2]').datepicker().on('changeDate', function(e) {
    values.dateTo = e.date;
    search();
  });

  $('[js-search-in-raw]').on('change', function() {
    values.searchRaw = this.checked;
    search();
  })

}(jQuery));