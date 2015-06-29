
function escapeXmlAttr(text) {
    text = text.replace(/&/g, "&amp;");

    return text;
}

function escapeFunctionScript(text) {
    text = text.replace("\\", "\\\\");
    text = text.replace(/'/gm, "\\'");
    text = text.replace(/\n/gm, "\\n");
    text = text.replace(/\r/gm, "\\r");
    return text;
}


/*
아래 형식으로 dataXML 을 만든다.
<?xml version="1.0" encoding="utf-8"?>
<DATA>
<ITEM title=" HTTP POST 방식으로 데이터 송수신 하기 코드 설명 " link="http://m.cafe.naver.com/ArticleRead.nhn?clubid=24809068&amp;articleid=692&amp;page=1&amp;boardtype=L&amp;menuid=58" info="MOML | 2014.10.02 | 조회 21" reply="123" />
...
</DATA>
*/
function getListData() {
    var i;
    var lst4Tags = document.getElementsByClassName("lst4");

    var dataXML = '<?xml version="1.0" encoding="utf-8"?>\r\n<DATA>\r\n';
    var dataCount = 0;

    for (i = 0; i < lst4Tags.length; ++i) {
        var isNoticeList = false;
        if (lst4Tags[i].id == "noticeList") {
            isNoticeList = true;
        }

        // 공지는 무시한다.
        if (isNoticeList)
            continue;

        var aTags = lst4Tags[i].getElementsByTagName("a");

        var j;
        for (j = 0; j < aTags.length; ++j) {
            if (aTags[j].href.indexOf("/ArticleRead.nhn?") >= 0 && aTags[j].className.indexOf("cmt_num") < 0) {
                var link = aTags[j].href;
                var title = aTags[j].getElementsByTagName("strong")[0].innerText.trim();
                var info = aTags[j].getElementsByClassName("info")[0].innerText.trim();
                var reply = "";
                var re_nums = aTags[j].getElementsByClassName("re_num");
                if (re_nums.length > 0)
                    reply = re_nums[0].innerText.trim();

                var comment = "";
								
				try {
					comment = "덧글 " + aTags[j].nextSibling.nextSibling.innerText;
				}catch(e) {
					//ignore error
				}

                dataXML = dataXML + '<ITEM title="' + escapeXmlAttr(title)
                + '" link="' + escapeXmlAttr(link)
                + '" info="' + escapeXmlAttr(info)
                + '" reply="' + escapeXmlAttr(reply)
                + '" comment="' + escapeXmlAttr(comment)
                 + '" />\r\n';

                ++dataCount;
            }
        }
    }

    dataXML = dataXML + '</DATA>';
    dataXML = escapeFunctionScript(dataXML);

    agate.runScript("function.loadListData('" + dataXML + "', " + dataCount + ")");
}

try {
    getListData();
} catch (e) {
    alert(e);
}
