const cardUsageHistoryList_defaultParams = {
  pageNo: 1,
  startDate: '20190901',
  endDate: '20191031',
  order: 'amount' // recency: 최신순, amount: 고액순
}

export default {
  methods: {
    api_getCardUsageHistoryList (params = cardUsageHistoryList_defaultParams) {
      if (cardUsageHistoryList.length === 0) {
        cardUsageHistoryList = makeCardUsageHistoryList()
      }

      // 서버에서 받아오는 시뮬레이션을 위해 promise 사용
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const resultList = cardUsageHistoryList
                              .filter((e) => { // 기간 필터링
                                return e.usedDate >= params.startDate && e.usedDate <= params.endDate
                              })
                              .sort((e1, e2) => { // 정렬
                                if (params.order === 'recency') {
                                  const dateValue = e2.usedDate.localeCompare(e1.usedDate)
                                  if (dateValue === 0) {
                                    return e2.usedTime.localeCompare(e1.usedTime)
                                  }
                                  return dateValue
                                } else if (params.order === 'amount') {
                                  return e2.paymentAmount > e1.paymentAmount ? 1: e2.paymentAmount < e1.paymentAmount ? -1 : 0
                                } else {
                                  return 0
                                }
                              })
          
          const startNo = (params.pageNo - 1) * 10
          const endNo = (params.pageNo * 10)

          const totalCount = cardUsageHistoryList.length
          const totalAmount = cardUsageHistoryList
                                .map((e) => e.paymentAmount || 0)
                                .reduce((accumulator, current) => accumulator + current, 0)

          const pageList = resultList.slice(startNo, endNo)
          // pageList.length < 10 || (resultList.length === (params.pageNo * 10))
          resolve({
            list: pageList,
            totalCount: totalCount,
            totalAmount: totalAmount,
            leaf: pageList.length < 10 || (resultList.length === (params.pageNo * 10))
          })
        }, 1000) // progress 표시를 위한 delay
      })
    }
  }
}

/*
  cardUsageHistory
  {
    id: 0, // PK
    shopName: '구글플레이', // 상점 이름
    usedDate: '20190910', // 결제 일(yyyyMMdd)
    usedTime: '104600', // 결제 시간(hhmmss)
    paymentAmount: '1000000', // 결제금액
    paymentPlan: 'onetime', // 결제방식(onetime: 일시불, installment: 할부)
    isEnabledInstallment: false, // 분할납부 신청 가능 여부
  }
 */
let cardUsageHistoryList = []
const SHOP_NAMES = ['구글플레이', '식당', '대형마트', '잡화점', '편의점', '주요소', '카페']

/*
 * dummy data 생성
 */
const makeCardUsageHistoryList = function (size) {
  const shopMaxIndex = SHOP_NAMES.length - 1
  let month = 9
  let day = 1

  let list = []
  for (let idx = 0; idx < 40; idx++) {
    list.push({
      id: idx,
      usedDate: '2019' + String(month).padStart(2, '0') + String(day).padStart(2, '0'),
      usedTime: String(getRandomNumber(0, 23)).padStart(2, '0') + String(getRandomNumber(0, 59)).padStart(2, '0') + '00',
      paymentAmount: getRandomNumber(1, 100) * 1000,
      paymentPlan: getRandomNumber(2, 0) === 0 ? 'installment' : 'onetime',
      isEnabledInstallment: getRandomNumber(2, 0) === 0,
      shopName: SHOP_NAMES[getRandomNumber(0, shopMaxIndex)]
    })

    day++
    if (day == 31) {
      day = 1
      month++
    }
  }

  return list
}

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
