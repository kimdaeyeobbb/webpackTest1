module.exports = function myLoader(item) {
    console.log('hello loader');

    return item.replace("console.log(", "alert(");  // item - loader로 처리해줄 것들 (html, css등의 파일). 이 내용물들이 문자열로 처리되므로 replace를 사용할 수 있음 | replace - js문법 
}