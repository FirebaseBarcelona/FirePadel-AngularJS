///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Court', function () {
  var service;

  beforeEach(angular.mock.module('home'));

  beforeEach(inject(function (Court) {
    service = Court;
  }));

  it('should equal Court', function () {
    expect(service.get()).toEqual('Court');
  });

});
