const extension = require('./../helper/extensions')

it('Check for if current time is in interval of times', async () => {

  let dummyWarehouseTime1 = [['2022/12/12', '2023/02/01']]
  let dummyWarehouseTime2 = [['2022/01/01', '2022/03/26']]
  let dummyWarehouseTime3 = [['2022/12/12', '2023/02/01'],['2023/07/04','2023/08/04']]

  let dummyRequestedTime1 = ['2022/12/12','2023/01/01']
  let dummyRequestedTime2 = ['2022/01/01', '2022/03/26']
  let dummyRequestedTime3 = ['2023/07/03','2023/08/03']
  

  await extension.checkIfTimeIsAvailbleWithWarehouseTime(dummyWarehouseTime1, dummyRequestedTime1).then((results) => {
    expect(results).toBe(true)
  })

  await extension.checkIfTimeIsAvailbleWithWarehouseTime(dummyWarehouseTime2, dummyRequestedTime2).then((results) => {
    expect(results).toEqual(true)
  })

  await extension.checkIfTimeIsAvailbleWithWarehouseTime(dummyWarehouseTime3, dummyRequestedTime3).then((results) => {
    expect(results).toEqual(false)
  })

  await extension.checkIfTimeIsAvailbleWithWarehouseTime(dummyWarehouseTime3, dummyRequestedTime2).then((results) => {
    expect(results).toEqual(false)
  })

  await extension.checkIfTimeIsAvailbleWithWarehouseTime(null, dummyRequestedTime2).then((results) => {
    expect(results).toBeUndefined()
  })

})

it('Format Date in yyyy/mm/dd', () => {

    let today = new Date()
    let formatedDateToday = `${new Date()}`.split('T')[0]

    let dummyDate = '2022-08-19T07:50:13.350Z'
    let expectedDate1 = '2022-08-19'

    expect(extension.formatDate(today)).toEqual(formatedDateToday)
    expect(extension.formatDate(dummyDate)).toEqual(expectedDate1)
    expect(extension.formatDate(today)).not.toMatch(expectedDate1)
})

it('Slice interval of Time into multiple intervals', () => {

    let dummyAvailbleDates1 = [['2022/03/01', '2022/04/04'],['2023/01/01', '2023/05/01']]
    
    let dummyTargetDate1 = ['2022/03/01', '2022/04/04']
    let dummyTargetDate2 = ['2022/03/01', '2022/04/02']
    let dummyTargetDate3 = ['2022/03/05', '2022/04/04']
    let dummyTargetDate4 = ['2022/03/10', '2022/04/01']

    console.log(extension.splitTimeByRequestedTime(dummyAvailbleDates1, dummyTargetDate1))
//    expect(extension.splitTimeByRequestedTime(dummyAvailbleDates1, dummyTargetDate1)).toEqual([['2023/01/01', '2023/05/01']])
})