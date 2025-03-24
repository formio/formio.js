export default {
    title: '6009test',
    name: '6009Test',
    path: '6009test',
    type: 'form',
    display: 'form',
    components:[
        {
            label: 'P1',
            inputType:'radio',
            tableView:false,
            key: 'p1',
            type:'checkbox',
            name:'priorities',
            value:'p1',
            input:true
        },
        {
            html:'<p>Content 1</p>',
            label:'P1 Content',
            refreshOnChange:false,
            key:'p1Content',
            type:'content',
            input:false,
            tableView:false,
            customConditional:'show = data.priorities == "p1"'
        },
        {
            type:'button',
            label:'Submit',
            key:'submit',
            disableOnInvalid:true,
            input:true,
            tableView:false
        }
    ]
};
