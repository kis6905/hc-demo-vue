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
            <a href="#" class="order active" @click.prevent="handleOrder" data-order="recency">최신순</a>
          </div>
          <div class="item">&nbsp;</div>
          <div class="item">
            <a href="#" class="order" @click.prevent="handleOrder" data-order="amount">고액순</a>
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
      isLast: false,
      params: {
        pageNo: 1,
        startDate: '20190901',
        endDate: '20191031',
        order: 'recency' // recency: 최신순, amount: 고액순
      },
      isLoading: false,
      isRefresh: true
    }
  },
  async created () {
    this.getCardUsageHistoryList(this.params)
  },
  methods: {
    async getCardUsageHistoryList (params) {
      this.isLoading = true
      if (this.params.pageNo === 1) {
        this.cardUsageHistoryList = []
      }
      const cardUsageHistoryInfo = await this.api_getCardUsageHistoryList(params)
      this.cardUsageHistoryList = this.cardUsageHistoryList.concat(cardUsageHistoryInfo.list)
      this.totalAmount = cardUsageHistoryInfo.totalAmount
      this.isLast = cardUsageHistoryInfo.isLast
      this.isLoading = false
    },
    getNextCardUsageHistoryList () {
      if (this.isLast) return
      if (this.isLoading) return false
      this.params.pageNo++
      this.getCardUsageHistoryList(this.params)
    },
    handleOrder (event) {
      this.params.order = event.target.dataset.order
      this.params.pageNo = 1
      const result = this.getCardUsageHistoryList(this.params)
      if (result) {
        document.getElementsByClassName('order active')[0].classList.remove('active')
        event.target.classList.add('active')
      }
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
