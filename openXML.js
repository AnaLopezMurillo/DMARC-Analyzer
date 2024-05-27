
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
    const XMLFilePath = './ExampleFiles/google.com!murojewelry.com!1716422400!1716508799.xml';
    const XMLDOc = await loadXML(XMLFilePath);

    if (XMLDOc) {
        let org = XMLDOc.getElementsByTagName('org_name')[0].innerHTML;
        let date_begin = XMLDOc.getElementsByTagName('begin')[0].innerHTML;
        let date_end = XMLDOc.getElementsByTagName('end')[0].innerHTML;
        const dateStart = timeConverter(date_begin);
        const dateEnd = timeConverter(date_end);

        let out_ta = document.getElementById("info");

        let orgP = document.getElementById('org');
        orgP.innerHTML = 'Organization: ' + org;

        let timeP = document.getElementById('time');
        timeP.innerHTML = "Time: " + dateStart + " to " + dateEnd

        let i = 0;
        let ips = XMLDOc.getElementsByTagName('source_ip');
        let ipP = document.getElementById('ips');
        for (let d of ips) {
            let ipSingle = document.createElement('h2');
            ipSingle.innerHTML = '&emsp; &emsp;' + d.innerHTML

            let policyEval = XMLDOc.getElementsByTagName('policy_evaluated');
            console.log(policyEval[i]);
            console.log(policyEval[i].getElementsByTagName('dkim')[0].innerHTML);

            ipP.appendChild(ipSingle);

            // console.log("Source IP: " + d.innerHTML + " Result: " + result[i].innerHTML);
            i+=1;
        }
        


    }
}

document.getElementById('xmlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileIn = document.getElementById('xmlFile');
    if (fileIn.files.length == 0) {
        alert('Please enter a valid file!');
        return;
    };

    const file = fileIn.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const XMLtext = event.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(XMLtext, "application/xml");
        console.log(xmlDoc);
        main();
    }
    reader.onerror = function() {
        alert('Error reading file');
    };
    reader.readAsText(file);
});

// adkim: adherence to alignment mode for DKIM protocol: r = relaxed
// p = policy employed (p = none, reject)
// ip from source address
    // dkim and spf show what what passed
    // disposition shows what the system did w/ the email
    // auth_results show individual DKIM and SPF results
