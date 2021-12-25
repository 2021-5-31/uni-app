'use strict';
exports.main = async (event, context) => {
  // try {
  //   const res = await uniCloud.sendSms({
  //     appid: '__UNI__xxxxxxx',
  //     smsKey: '****************',
  //     smsSecret: '****************',
  //     phone: '188********',
  //     templateId: 'uniID_code',
  //     data: {
  //       name: 'DCloud',
  //       code: '123456',
  //       action: '注册',
  //       expMinute: '3',
  //     }
  //   })
    // 调用成功，请注意这时不代表发送成功
  //   return res
  // } catch(err) {
  //   // 调用失败
  //   console.log(err.errCode)
  //   console.log(err.errMsg)
  //   return {
  //     code: err.errCode,
  //     msg: err.errMsg
  //   }
  // }
  const phoneCode = Math.random().toString().substr(2,6);
  return {
	  code:0,
	  msg:'send successfully',
	  data:phoneCode
  }
};