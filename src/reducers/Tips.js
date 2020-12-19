var _ = require('lodash')

var RDActionsTypes = require( '../actions/RDActionsTypes');

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
var RDUtil = require('./RDUtil');
// NOTE : if want to use promise of middleware action , this reducer must update state to a temp to use in then of promise
// =>no no no , only need update state variable from reduxManager in then funciton   (maybe because pointer changed)

function initLoading(){
  let retObj={};
  Object.keys(RDActionsTypes.Tips).forEach((key)=>{
    if (key === 'constants') { return;}
    retObj[key] = {loading:0};
  })
  return retObj;
}

var tipsArray=[
    // introduce
    'Chúng tôi là nhóm những cá nhân nhiệt huyết có mong muốn đóng góp cho cộng đồng',
    'Ứng dụng được xây dựng dựa trên một công nghệ mới cho phép cập nhật cực kỳ nhanh chóng ☺',
    'Chúng tôi đang có rất nhiều ý tưởng để tối ưu và phát triển ứng dụng tốt hơn và rất lắng nghe ý kiến từ các bạn ☝',
    'Do nhân lực và khó khăn, chúng tôi có thể mắc lỗi trong quá trình phát triển khiến ứng dụng không ổn định, hy vọng các bạn hiểu ☹',
    'Hãy hỗ trợ chúng tôi trên con đường sắp tới để chúng ta có thể giúp những người khó khăn khi tìm thêm thu nhập ở Hà Nội',
    'Chúng tôi sẽ giấu những bí mật trong ứng dụng ☠',
    // usage
    'Bạn có thể xem hết nội dung bài post bằng cách vuốt em nó trong mục comment ☹',
    'Bạn có thể bật chức năng xác định vị trí của bạn bằng cách nhấn vào biểu tượng vị trí bên trái ô tìm kiếm',
    'Bạn có thể nhập địa điểm vào ô tìm kiếm và lọc được cả những địa điểm xung quanh đó bằng cách điều chỉnh bán kính',
    'Bạn có thể lọc nhiều địa điểm cùng lúc cách nhau bởi dấu phẩy trong ô tìm kiếm',
    'Bạn có chat hỗ trợ trực tuyến với chúng tôi trên trang web heyu.asia',
    'Bạn có thể tùy chọn nội dung nhận nhanh trong mục cài đặt',
    'Số lượng tin bài hiển thị trong mục cài đặt có thể ảnh hưởng tới độ mượt của ứng dụng ☕',
    'Số lượng tin bài trong bộ nhớ đệm có thể ảnh hưởng tới bộ nhớ mà ứng dụng cần sử dụng',
    'Những tin mới lấy về có màu nền đậm hơn những tin cũ',
    'Bạn có thể tránh trôi bài bằng cách kéo danh sách tin xuống dưới',
    'Bạn có thể gạt nút bên phải ô tìm kiếm để chỉ hiện thị những tin đáp ứng điều kiện lọc, nếu không, những tin đó sẽ có viền đỏ',
    'Tin sẽ được tự lưu ngay khi bạn sử dụng tính năng nhận ngay',
    'Nếu bạn nhấn vào tên người đăng bài sẽ link sang facebook của họ',
    'Dữ liệu bạn đang thấy được lấy từ các page facebook và từ hệ thống, tuy nhiên các tính năng thông báo và lọc sẽ hoạt động tốt với những tin bài từ hệ thống',
    'Shop hãy đăng bài qua hệ thống để ship có thể lọc bài bạn chính xác hơn giúp khả năng thành công cao hơn',

    // plan
    'Chúng tôi sẽ có cơ chế tiện lợi cho việc xác thực cá nhân làm ship và shop, tránh những sự việc không mong muốn cho các bạn',
    'Bạn có muốn một hệ thống rating ?',
    'Sẽ có chức năng cho shop, ship ruột :)',
    'Sự ngạc nhiên mà chúng tôi có dự định sẽ mang tới cho các bạn về trải nghiệm trong ứng dụng, cho cả shop và ship :)',
    'Chúng tôi sẽ cố gắng mang tới cho bạn những thông tin cần thiết và nhanh nhất',
    'Sắp tới tài xế hãy cho chúng tôi biết trạng thái của bạn để chúng tôi có thể giúp bạn nhận được những đơn phù hợp',

]
function Tips(state ={
                ...initLoading(),
                tipList:tipsArray
              } , action) {
  var stateTemp =state;
  switch (action.type) {
    case RDActionsTypes.Tips.nameAction:{
      stateTemp = RDUtil.processReducerLoading(state,action,'nameAction',
                {
                  onSuccess:(stateTempIn)=>{ return stateTempIn;}
                })

      break;
    }
    default:
      // Debug.log('ServerConnection:unknown type:'+action.type);
      break;
  }

  return stateTemp;

}


module.exports= Tips;
