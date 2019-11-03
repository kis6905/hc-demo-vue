<template>
  <div class="contents  bg-gray">
    <div class="page-header">
      <div class="area area-left">
        <div class="item title">이용내역</div>
        <div class="item period">09.01~10.30</div>
      </div>
      <div class="area area-right">
        <div class="item"><button type="button">필터</button></div>
        <div class="item"><button type="button">캘린더</button></div>
      </div>
    </div>
    <div class="page-body">
      <div class="list-title">
        <div class="area area-left">
          <div class="item">
            <a href="#" class="order active">최신순</a>
          </div>
          <div class="item">&nbsp;</div>
          <div class="item">
            <a href="#" class="order">고액순</a>
          </div>
        </div>
        <div class="area area-right">
          <div class="item total-amount">{{ formattedTotalAmount }} 원</div>
        </div>
      </div>
      <CardUsageHistoryList
        :card-usage-history-list="cardUsageHistoryList"
        :is-loading="isLoading"
        v-on:get-next-card-usage-history-list="getNextCardUsageHistoryList"></CardUsageHistoryList>
    </div>
  </div>
</template>

<script>
import CardUsageHistoryList from './TheCardUsageHistoryList'
import apiMixin from '../mixins/apiMixin'

export default {
  name: 'cardUsageHistory',
  mixins: [apiMixin],
  components: {
    CardUsageHistoryList
  },
  data () {
    return {
      cardUsageHistoryList: [],
      totalAmount: 0,
      leaf: false,
      params: {
        pageNo: 1,
        startDate: '20190901',
        endDate: '20191031',
        order: 'recency' // recency: 최신순, amount: 고액순
      },
      isLoading: true
    }
  },
  async created () {
    this.getCardUsageHistoryList(this.params)
  },
  methods: {
    async getCardUsageHistoryList (params) {
      if (this.leaf) return
      this.isLoading = true
      const cardUsageHistoryInfo = await this.api_getCardUsageHistoryList(params)
      this.cardUsageHistoryList = this.cardUsageHistoryList.concat(cardUsageHistoryInfo.list)
      this.totalAmount = cardUsageHistoryInfo.totalAmount
      this.leaf = cardUsageHistoryInfo.leaf
      this.isLoading = false
    },
    getNextCardUsageHistoryList () {
      // TODO: lock이 필요할 듯... 어떤 방식으로?
      console.log('getNextCardUsageHistoryList')
      this.params.pageNo++
      this.getCardUsageHistoryList(this.params)
    }
  },
  computed: {
    formattedTotalAmount () {
      return this.util_numberFormat(this.totalAmount)
    }
  }
}
</script>

<style scoped lang="less">
button {
  background-color: white;
  border: 0;
}
.contents {
  min-height: 100vh;
}
.bg-gray {
  background-color: #f7f7f7;
}
.page-header {
  position: relative;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid;
  border-color: #dddddd;
  background-color: #ffffff;

  .area {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    padding-top: 10px;

    .item {
      float: left;
      padding: 0 5px;
    }
    .title {
      font-weight: bold;
      font-size: 1.1rem;
    }
    .period {
      color: #777777;
      font-size: 0.8rem;
    }
  }
  .area-left {
    left: 15px;
  }
  .area-right {
    right: 15px;
  }
}
.page-body {
  padding: 10px 20px;

  .list-title {
    position: relative;

    .area {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;

      .item {
        float: left;
        padding: 0;
      }
    }
    .area-left {
      left: 0px;
    }
    .area-right {
      right: 0px;
    }

    .order {
      text-decoration: none;
      color: #000000;
    }
    .order.active {
      color: #3087f8;
    }

    .total-amount {
      font-weight: bold;
    }
  }
}
</style>
