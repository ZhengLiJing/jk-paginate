const assert = require("assert");
const Paginator = require("../lib/jk-paginate.js").Paginator;

function testPaginator () {
  console.log("Running Paginate test");
  var item = new Paginator({
    totalItems: 100,
    currentPage: 1
  });
  assert.deepEqual(
    {
      totalItems: 100,
      totalPages: 10,
      currentPage: 1,
      pageSize: 10,
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      startPage: 1,
      endPage: 10,
      startIndex: 0,
      endIndex: 9,
      preLink: "",
      previous: null,
      next: 2,
      first: null,
      last: 10
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
      totalPages: 10,
      currentPage: 8,
      pageSize: 10,
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      startPage: 1,
      endPage: 10,
      startIndex: 70,
      endIndex: 79,
      preLink: "",
      previous: 7,
      next: 9,
      first: 1,
      last: 10
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
      totalPages: 10,
      currentPage: 10,
      pageSize: 10,
      pages: [4, 5, 6, 7, 8, 9, 10],
      startPage: 4,
      endPage: 10,
      startIndex: 90,
      endIndex: 99,
      preLink: "",
      previous: 9,
      next: null,
      first: 1,
      last: 10
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
      totalPages: 10,
      currentPage: 8,
      pageSize: 10,
      pages: [4, 5, 6, 7, 8, 9, 10],
      startPage: 4,
      endPage: 10,
      startIndex: 70,
      endIndex: 79,
      preLink: "",
      previous: 7,
      next: 9,
      first: 1,
      last: 10
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
      totalPages: 10,
      currentPage: 5,
      pageSize: 10,
      pages: [2, 3, 4, 5, 6, 7, 8],
      startPage: 2,
      endPage: 8,
      startIndex: 40,
      endIndex: 49,
      preLink: "",
      previous: 4,
      next: 6,
      first: 1,
      last: 10
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
      totalPages: 10,
      currentPage: 5,
      pageSize: 10,
      pages: [2, 3, 4, 5, 6, 7],
      startPage: 2,
      endPage: 7,
      startIndex: 40,
      endIndex: 49,
      preLink: "",
      previous: 4,
      next: 6,
      first: 1,
      last: 10
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
      totalPages: 10,
      currentPage: 5,
      pageSize: 10,
      pages: [3, 4, 5, 6],
      startPage: 3,
      endPage: 6,
      startIndex: 40,
      endIndex: 49,
      preLink: "",
      previous: 4,
      next: 6,
      first: 1,
      last: 10
    },
    item.calc()
  );
}

// testPaginator();

function testFuncPreparePreLink () {
  console.log("Running Function of preparePreLink test");
  const item = new Paginator({
    totalItems: 100,
    currentPage: 1
  });
  let preLink = 'https://www.jingke.com'
  assert.deepEqual(
    'https://www.jingke.com?',
    item.preparePreLink(preLink)
  )

  preLink = 'https://www.jingke.com/?page=4'
  assert.deepEqual(
    'https://www.jingke.com/?page=4&',
    item.preparePreLink(preLink)
  )

  console.log(item.preparePreLink('/?'))
}

testFuncPreparePreLink()