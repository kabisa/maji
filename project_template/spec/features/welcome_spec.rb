require 'spec_helper'

describe 'Hello world' do
  before do
    visit '/index.html'
  end

  it 'shows a greeting' do
    expect(page).to have_text 'Welcome to your Maji app'
  end
end
