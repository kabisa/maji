require('../view_spec_helper')
IndexPage = require('../../app/modules/home/views/index_page')

describe 'IndexPage', ->
  beforeEach ->
    @view = new IndexPage()

  it 'shows a message', ->
    DOM.append @view.render().el
    expect(@view.$el.find('p.welcome').text().trim()).to.eq('Welcome to your Maji app!')
