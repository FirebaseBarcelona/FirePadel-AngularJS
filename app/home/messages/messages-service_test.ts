///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Messages', function () {
  var service;

  beforeEach(angular.mock.module('home'));

  beforeEach(inject(function (Messages) {
    service = Messages;
  }));

  it('should equal Messages', function () {
    expect(service.get()).toEqual('Messages');
  });

});
