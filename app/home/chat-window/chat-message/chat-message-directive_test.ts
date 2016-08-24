///<reference path='../../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('chatMessage', function () {
  var scope
    , element;

  beforeEach(angular.mock.module('home', 'home/chat-message-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<chat-message></chat-message>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().chatMessage.name).toEqual('chatMessage');
  });

});
