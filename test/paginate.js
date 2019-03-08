const assert = require("assert");
const Paginator = require("../lib/jk-paginate.js").Paginator;

function test() {
  console.log("Running Paginate test");
  var item = new Paginator({
    totalItems: 100,
    currentPage: 1
  });
  assert.deepEqual(
    {
      totalItems: 100,
      currentPage: 1,
      pageSize: 10,
      totalPages: 10,
      startPage: 1,
      endPage: 10,
      startIndex: 0,
      endIndex: 9,
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    item.calc()
  );

  var item = new Paginator({
    totalItems: 100,
    currentPage: 8
  });
  assert.deepEqual(
    {
      totalItems: 100,
      currentPage: 8,
      pageSize: 10,
      totalPages: 10,
      startPage: 1,
      endPage: 10,
      startIndex: 70,
      endIndex: 79,
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    item.calc()
  );
  
  var item = new Paginator({
    totalItems: 100,
    currentPage: 11,
    pageLinks: 7
  });
  assert.deepEqual(
    {
      totalItems: 100,
      currentPage: 10,
      pageSize: 10,
      totalPages: 10,
      startPage: 4,
      endPage: 10,
      startIndex: 90,
      endIndex: 99,
      pages: [4, 5, 6, 7, 8, 9, 10]
    },
    item.calc()
  );

  var item = new Paginator({
    totalItems: 100,
    currentPage: 8,
    pageLinks: 7
  });
  assert.deepEqual(
    {
      totalItems: 100,
      currentPage: 8,
      pageSize: 10,
      totalPages: 10,
      startPage: 4,
      endPage: 10,
      startIndex: 70,
      endIndex: 79,
      pages: [4, 5, 6, 7, 8, 9, 10]
    },
    item.calc()
  );

  var item = new Paginator({
    totalItems: 100,
    currentPage: 5,
    pageLinks: 7
  });
  assert.deepEqual(
    {
      totalItems: 100,
      currentPage: 5,
      pageSize: 10,
      totalPages: 10,
      startPage: 2,
      endPage: 8,
      startIndex: 40,
      endIndex: 49,
      pages: [2, 3, 4, 5, 6, 7, 8]
    },
    item.calc()
  );

  var item = new Paginator({
    totalItems: 100,
    currentPage: 5,
    pageLinks: 6
  });
  assert.deepEqual(
    {
      totalItems: 100,
      currentPage: 5,
      pageSize: 10,
      totalPages: 10,
      startPage: 2,
      endPage: 7,
      startIndex: 40,
      endIndex: 49,
      pages: [2, 3, 4, 5, 6, 7]
    },
    item.calc()
  );

  var item = new Paginator({
    totalItems: 100,
    currentPage: 5,
    pageLinks: 4
  });
  assert.deepEqual(
    {
      totalItems: 100,
      currentPage: 5,
      pageSize: 10,
      totalPages: 10,
      startPage: 3,
      endPage: 6,
      startIndex: 40,
      endIndex: 49,
      pages: [3, 4, 5, 6]
    },
    item.calc()
  );
}

test();
