///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Users', function () {
  var service;

  beforeEach(angular.mock.module('home'));

  beforeEach(inject(function (Users) {
    service = Users;
  }));

  it('should equal Users', function () {
    expect(service.get()).toEqual('Users');
  });

});
