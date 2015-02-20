require('../view_spec_helper')
IndexPage = require('../../app/modules/home/views/index_page')

describe 'IndexPage', ->
  beforeEach ->
    @view = new IndexPage()

  it 'shows a message', ->
    $('body').append @view.render().el
    expect(@view.$el.find('.body').text().trim()).to.eq('hello world')
