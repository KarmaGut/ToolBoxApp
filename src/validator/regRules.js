// 昵称校验规则：只能是中文，英文或者是数字(最多12个字符)
const userNameReg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,12}$/;

export { userNameReg };