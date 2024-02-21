import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, Animated, PanResponder } from "react-native";
import TenderCard from "../components/TenderCard";

const TenderSwipe = () => {

    const [data, setData] = useState([
        {id:1, color:"#aafabb"},
        {id:2, color:"#b1d8fa"},
        {id:3, color:"#fab1b1"},
        {id:4, color:"#eea0fa"},
        {id:5, color:"#ffbd8a"},
    ])

    useEffect(()=>{
        console.log('swipe')
        if(!data.length)
        {setData
           ([
            {id:1, color:"#aafabb"},
            {id:2, color:"#b1d8fa"},
            {id:3, color:"#fab1b1"},
            {id:4, color:"#eea0fa"},
            {id:5, color:"#ffbd8a"},
           ]);
       }
    }, [data]);

    const swipe = useRef(new Animated.ValueXY()).current;
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_,{dx,dy}) => {
            swipe.setValue({x:dx, y:dy});
        },
        onPanResponderRelease: (_,{dx,dy}) =>{
            let direction = Math.sign(dx);
            let isActionActive = Math.abs(dx)>100;
            if(isActionActive){
                Animated.timing(swipe,
                    {toValue :{x: 500*dx, y : dy},
                     useNativeDriver: true,
                     friction:5
                    }).start(removeCard);
            }
            else{
                Animated.spring(swipe,
                    {toValue :0,
                     useNativeDriver: true,
                     friction:5
                    }).start();
            }

        }
    })

    const removeCard = useCallback(()=>{
        setData(preState => preState.slice(1));
        swipe.setValue({x:0,y:0});
    },[swipe]);

   

    return <View>
      {data.map( (item, index) => {
        let isFirst = index===0;
        let dragHandler = isFirst ? panResponder.panHandlers : {};
        return <TenderCard key={item.id} item={item} isFirst={isFirst} swipe={swipe} {...dragHandler}/>
      }).reverse()}
    </View>
}

export default TenderSwipe;