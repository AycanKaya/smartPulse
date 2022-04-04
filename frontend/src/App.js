/* 

  @author : Aycan Kaya

*/
import axios from 'axios';
import { useEffect, useState } from 'react';


//PHYYAAGGSS
function convertDate(strDate){
  var year = "20"+strDate.substr(2,2)
  var mounth= strDate.substr(4,2)
  var day=strDate.substr(6,2)
  let date= new Date(year,mounth-1,day)
 
  return year+" "+mounth+" "+day
}

function App() {
  const [data, setData] = useState();
  const [list, setList] = useState();
  
  useEffect(() => {
    axios("http://localhost:8080/trade-history", {
      method: 'GET',
    }).then(response => {
      setData(response.data.body)
    });
  }, [])

  useEffect(() => {
    const listItems=[];
    if(data){

      data.intraDayTradeHistoryList.forEach(i=>{

        if(i.conract.startsWith('PH')){
           if(!listItems.find(item=>item.conract===i.conract)){
            listItems.push({
              conract:i.conract,
              date:convertDate(i.conract),
              totalProcessAmount:i.quantity*i.price/10,
              costOfProcess:i.quantity/10,
              avarageCost:i.price/i.quantity,
            })
        

           }else{
            let index = listItems.indexOf(listItems.find(item=>item.conract===i.conract));
            listItems[index]={
              conract:i.conract,
               date:convertDate(i.conract),
              totalProcessAmount:listItems[index].totalProcessAmount+i.price*i.quantity/10,
              costOfProcess:listItems[index].costOfProcess+i.quantity/10,
              avarageCost:listItems[index].avarageCost+i.price/i.quantity,
            }

           }
                
        }

      })
      setList(listItems)
    }


    
  

  }, [data])

  return (

    
 <div>
   {
     list &&

    <table>
      <thead>
      <tr>
        <th>Tarih</th>
        <th>Toplam İşlem Miktarı (MWh)</th>
        <th>Toplam İşlem Tutarı (TL)</th>
        <th>Ağırlık Ortalama Fiyatı (TL/MWh)</th>
      </tr>
      </thead>
    <tbody>

      {list.map((item,i)=>
        <tr key={i} >
        <td>{item.date}</td>
        <td>{item.costOfProcess}</td>
        <td>{item.totalProcessAmount}</td>
        <td>{item.avarageCost}</td>
      </tr>
        )}
    </tbody>
    </table>
   }

 </div>
    
  
  );
}

export default App;
