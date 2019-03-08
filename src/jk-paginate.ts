function paginate (options) {
  let totalItems: number = options.totalItems
  let currentPage: number = options.currentPage || 1
  let pageSize: number = options.pageSize || 10
  let maxPages: number = options.maxPages || 10

  // 计算总页数，比如一共300个条目，每页显示的条目 = 总条目/pageSize
  let totalPages = Math.ceil(totalItems / pageSize)

  // 确保当前页不越界
  if (currentPage < 1) {
    currentPage = 1
  } else if (currentPage > totalPages) {
    currentPage = totalPages
  }
  let startPage: number, endPage: number
  // 如果总页数小于最大页数，比如总页数8也，maxPages=10,则全部全部页数 
  if (totalPages < maxPages) {
    startPage = 1
    endPage = totalPages
  } else {
    // 如果总页数大于最大页数，比如总页数20也，maxPages=10，
    // 则需要计算起始页和末尾页，有三种情况

    // 当前页之前最多能显示的页数，5
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
    // 当前页之后最多能显示的页数，4
    let maxPagesAfterCurrentPage = Math.floor(maxPages / 2) - 1
    // 情况一：当前页靠近首页
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1
      endPage = maxPages
    } else if ((totalItems - maxPagesAfterCurrentPage) < currentPage && currentPage < totalItems) {
      // 情况二：当前页靠近末页
      startPage = totalPages - maxPages + 1
      endPage = totalPages
    } else {
      // 情况三：当前页位于中间
      startPage = currentPage - maxPagesBeforeCurrentPage
      endPage = currentPage + maxPagesAfterCurrentPage
    }
    // 计算条目的起始和末尾索引
    let startIndex = (currentPage - 1) * pageSize 
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems)

    // 创建一个页面数组，[1,2,3,4,5,6,7,8,9,10]
    let pages = Array
      .from(Array((endPage + 1) - startPage)
      .keys())
      .map(i => startPage + i)
    
    // 返回一个包含所有信息的对象
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    }
  }
}

export = paginate