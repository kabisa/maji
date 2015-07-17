NavigationStack = require '../src/navigation_stack'


describe 'NavigationStack', ->
  beforeEach ->
    @stack = new NavigationStack()
    @navigationElement1 = route: '#/route1', transition: 'slide'
    @navigationElement2 = route: '#/route2', transition: 'slideup'

  describe '#push', ->
    it 'appends the provided navigation element to the stack', ->
      @stack.push @navigationElement1
      @stack.push @navigationElement2

      expect(@stack.get(0)).to.eq @navigationElement1
      expect(@stack.get(1)).to.eq @navigationElement2

  describe '#pop', ->
    it 'removes the first entry from the tail of stack', ->
      @stack.push @navigationElement1

      expect(@stack.pop()).to.eq @navigationElement1
      expect(@stack.length()).to.eq 0

  describe '#unwind', ->
    beforeEach ->
      @stack.push @navigationElement1
      @stack.push @navigationElement2
      @stack.push route: '#/foo/bar', transition: 'slideup'
      @stack.push route: '#/bar/foo', transition: 'slideup'

    it 'unwinds the stack until the given route', ->
      @stack.unwind('#/route1')
      expect(@stack.length()).to.eq 1
      expect(@stack.get(0)).to.eq @navigationElement1

    it 'returns the item on top of the specified route', ->
      expect(@stack.unwind('#/route1').route).to.eq('#/route2')

  describe '#toString', ->
    it 'shows the routes only', ->
      @stack.push @navigationElement1
      @stack.push @navigationElement2

      expect(@stack.toString()).to.eq("#{@navigationElement1.route}, #{@navigationElement2.route}")

