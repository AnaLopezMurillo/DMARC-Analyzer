
/* loadXML(filePath: string)
    Reads and loads the XML file at specified file path, and parses as an XML Doc. Returns an error if fetch or parsing fails. 
*/
async function loadXML(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('fetch failed');
        }

        const XMLtext = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(XMLtext, "application/xml");
        
        return xmlDoc;
    }
    catch (error) {
        return new Error('parsing failed');
        return null;
    }
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

// main function that parses the XML in the HTML document
async function main() {
    const XMLFilePath = './google.com!murojewelry.com!1716336000!1716422399.xml';
    const XMLDOc = await loadXML(XMLFilePath);

    if (XMLDOc) {
        let org = XMLDOc.getElementsByTagName('org_name')[0].innerHTML;
        let date_begin = XMLDOc.getElementsByTagName('begin')[0].innerHTML;
        let date_end = XMLDOc.getElementsByTagName('end')[0].innerHTML;
        const dateStart = timeConverter(date_begin);
        const dateEnd = timeConverter(date_end);

        let doms = XMLDOc.getElementsByTagName('domain');
        let result = XMLDOc.getElementsByTagName('result');

        console.log("Organization: " + org);
        console.log("Time: " + dateStart + " to " + dateEnd); 

        let i = 0;
        for (let d of doms) {
            console.log("Domain: " + d.innerHTML + " Result: " + result[i].innerHTML);
        }

        // let out_ta = document.getElementById("info");
        // let exampleNode = document.createElement('p');
        // exampleNode.innerHTML = "hello world";

        // out_ta.append(document.createElement('p').innerHTML = 'Organization: ')
        // out_ta.append(document.createElement('p').innerHTML = org)

        // out_ta.append(document.createElement('p').innerHTML = '\n')
        // out_ta.append(document.createElement('p').innerHTML = "Time: " + dateStart + " to " + dateEnd);
        

    }
}

main();

// list based off of IP and 


// adkim: adherence to alignment mode for DKIM protocol: r = relaxed
// p = policy employed (p = none, reject)
// ip from source address
    // dkim and spf show what what passed
    // disposition shows what the system did w/ the email
    // auth_results show individual DKIM and SPF results
