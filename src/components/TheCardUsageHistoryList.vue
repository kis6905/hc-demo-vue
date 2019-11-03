<template>
  <div class="history-area" ref="historyArea">
    <div v-if="cardUsageHistoryList.length > 0">
      <div class="history-item"
           v-for="cardUsageHistory in cardUsageHistoryList"
           :key="cardUsageHistory.id">
        {{ cardUsageHistory.shopName }} <span class="amount">{{ displayAmount(cardUsageHistory.paymentAmount) }}원</span>
        <br/>
        <span class="font-small color-gray">
          {{ displayUsedDatetime(cardUsageHistory.usedDate, cardUsageHistory.usedTime) }}
          {{ displayPaymentPlan(cardUsageHistory.paymentPlan) }}
        </span>
      </div>
      <div class="history-item" v-show="isLoading">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardUsageHistoryList',
  props: {
    cardUsageHistoryList: {
      type: Array
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.handleDebouncedScroll = this._.debounce(this.handleScroll, 100)
    this.$refs.historyArea.addEventListener('scroll', this.handleDebouncedScroll)
  },
  destroyed () {
    this.$refs.historyArea.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    displayAmount (amount) {
      return this.util_numberFormat(amount)
    },
    displayPaymentPlan (paymentPlan) {
      return paymentPlan === 'installment' ? '할부' : paymentPlan === 'onetime' ? '일시불' : ''
    },
    displayUsedDatetime (date, time) {
      const displayDate = date.substring(2, 4) + '.' + date.substring(4, 6) + '.' + date.substring(6, 8)
      const displayTime = time.substring(0, 2) + ':' + time.substring(2, 4)
      return displayDate + ' ' + displayTime
    },
    handleScroll (event) {
      let el = this.$refs.historyArea
      if (el.scrollHeight - el.offsetHeight === el.scrollTop) {
        this.$emit('get-next-card-usage-history-list')
      }
    }
  },
  watch: {
    isLoading () {
      // 맨 하단으로 스크롤 이동
      if (this.isLoading) {
        this.$nextTick(function () {
          this.$refs.historyArea.scrollTo(0, this.$refs.historyArea.scrollHeight)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.history-area {
  margin-top: 40px;
  max-height: 84vh;
  overflow-y: auto;

  .history-item {
    min-height: 40px;
    padding: 15px 0 15px 0;
    border-bottom: 1px solid;
    border-color: #cccccc;

    .amount {
      font-weight: bold;
    }
    .font-small {
      font-size: 0.9rem;
    }
    .color-gray {
      color: #999999;
    }
  }
}
</style>
