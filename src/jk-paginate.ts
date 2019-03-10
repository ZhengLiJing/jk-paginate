const Paginator = function(options) {
  let defaultOption = {
    totalItems: 100,
    currentPage: 1,
    pageSize: 10,
    pageLinks: 10,
    preLink: '',
  };
  this.options = Object.assign({}, defaultOption, options);
};

Paginator.prototype = {
  calc: function() {
    let { totalItems, currentPage, pageSize, pageLinks, preLink } = this.options;
    const result = {
      totalItems,
      totalPages: null,
      currentPage,
      pageSize,
      pages: [],
      startPage: null,
      endPage: null,
      startIndex: null,
      endIndex: null,
      preLink,
      previous: null,
      next: null,
      first: null,
      last: null
    }

    // 计算总页数，比如一共300个条目，每页显示的条目 = 总条目/pageSize
    let totalPages = Math.ceil(totalItems / pageSize);
    result.totalPages = totalPages

    let oddPageLinks = pageLinks % 2 !== 0 ? 0 : 1;

    // 确保当前页不越界
    if (currentPage < 1) {
      currentPage = 1
      result.currentPage =1
    } else if (currentPage > totalPages) {
      currentPage = totalPages
      result.currentPage = totalPages
    }
    let startPage: number, endPage: number, startIndex: number, endIndex: number;
    // 如果总页数小于最大页数，比如总页数8也，pageLinks=10,则全部全部页数
    if (totalPages < pageLinks) {
      result.startPage = 1
      result.endPage = totalPages
    } else {
      // 如果总页数大于最大页数，比如总页数20也，pageLinks=10，
      // 则需要计算起始页和末尾页，有三种情况

      // 当前页之前最多能显示的页数
      let maxPagesBeforeCurrentPage = Math.floor(pageLinks / 2);
      // 当前页之后最多能显示的页数
      let maxPagesAfterCurrentPage = Math.floor(pageLinks / 2) - oddPageLinks;
      // 情况一：当前页靠近首页
      if (currentPage <= maxPagesBeforeCurrentPage) {
        result.startPage = 1
        result.endPage = pageLinks
      } else if (currentPage + maxPagesAfterCurrentPage > totalPages) {
        // 情况二：当前页靠近末页
        result.startPage = totalPages - pageLinks + 1;
        result.endPage = totalPages
      } else {
        // 情况三：当前页位于中间
        result.startPage = currentPage - maxPagesBeforeCurrentPage;
        result.endPage = currentPage + maxPagesAfterCurrentPage;
      }

      if (currentPage > 1) {
        result.first = 1
        result.previous = currentPage - 1
      }

      if (currentPage < totalPages) {
        result.last = totalPages
        result.next = currentPage + 1
      }
      
      if (currentPage === totalPages) {
        result.last = totalPages
      }

      // 计算条目的起始和末尾索引
      result.startIndex = (currentPage - 1) * pageSize;
      result.endIndex = Math.min(result.startIndex + pageSize - 1, totalItems);
      // 创建一个页面数组，[1,2,3,4,5,6,7,8,9,10]
      result.pages = Array.from(Array(result.endPage + 1 - result.startPage).keys()).map(
        i => result.startPage + i
      );

      // 返回一个包含所有信息的对象
      return result
    }
  }
};

export { Paginator };
