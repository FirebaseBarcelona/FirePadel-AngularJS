///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('chatWindow', function () {
  var scope
    , element;

  beforeEach(angular.mock.module('home', 'home/chat-window-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<chat-window></chat-window>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().chatWindow.name).toEqual('chatWindow');
  });

});
