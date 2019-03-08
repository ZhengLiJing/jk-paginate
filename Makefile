NODE=node

TEST_FILES=$(shell find test/*.js)

test:
	$(foreach F, ${TEST_FILES}, $(NODE) $(F);)

.PHONY: test