# testingproj-k

1. 페이지별 index.html js css로 만들 것인지 SPA의 기본 틀로 만들 것인지 고민 후 SPA의 기본 틀을 따라가기로 함.
2. SPA에서 addEventListener 는 onload 와 hashChange 로만 구현.
3. 1개의 mainTherad 를 생성(index.ts 의 setInterval 함수) 이 mainThread 에서 비동기적인 렌더를 모두 처리함.
4. router가 변할 때마다 미리 구현된 render interface를 상속받은 각각의 page 구현체를 이용해 렌더링함.
6. router가 변할 때 아래의 단계를 거침
- beforeRender 가 있으면 beforeRender 함수 호출. render 전에 필요한 전처리함수
- render 함수를 호출하여 hash-div 하위의 innerTHML 을 변환
- attachEvent 는 페이지 렌더링 후 element에 필요한 event를 bind 해줌.
7. 만약 특정 event에 의해서 비동기적으로 update가 필요할 경우 event Queue 를 이용하며,
이 eventQueue 는 3번에서 만든 mainThread 에서 렌더 함수를 호출함.
8. route가 변할 때의 event와 3번의 mainThread 의 이벤트가 비동기 적이므로, route를 변할 때에도
mainThread 에서 처리함. 단, route가 변한 후에는 이후에 있는 모든 event Queue 를 비워야 함.
(route가 변하여 다른 페이지로 갔는데도 이전의 update 함수가 호출되면 안 됨)
