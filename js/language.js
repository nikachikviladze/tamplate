new Vue({
    el: '#language-form',
    data: {
        dropDownHidden: true,
        chosenItem: {
            value: 'ka',
            text: 'ქართული'
        },
        filterText: '',
        dropDownItems: [
            {
                value: 'ka',
                text: 'ქართული'
            },
            {
                value: 'en',
                text: 'ინგლისური',
            },
            {
                value: 'enგ',
                text: 'ინგლისური ფ',
            },
            {
                value: 'ru',
                text: 'რუსული',
                separated: true
            },
            {
                value: 'de',
                text: 'გერმანული'
            }
        ]
    },
    computed: {
        filteredItems () {
            let reg = RegExp(`^${this.filterText}`)
            return this.dropDownItems.filter((item) => reg.test(item.text))
        },

    },
    methods: {
        typeFilterText (event) {
            let reg = RegExp(`^${event.target.value}`)
            let item = this.dropDownItems.find((item) => reg.test(item.text))
            console.log(item.value)
            this.focusDropDownItem(item.value)
        },
        chooseItem (item) {
            this.chosenItem = {
                value: item.value,
                text: item.text
            }
            this.toggleDropDownVisibility()
        },
        toggleDropDownVisibility () {
            this.dropDownHidden = !this.dropDownHidden
        },
        isFocused(value) {
            let index = this.dropDownItems.findIndex((item) => item.value === value)
            return this.dropDownItems[index].focused
        },
        focusDropDownItem (value) {
            let index = this.dropDownItems.findIndex((item) => item.value === value)
            for (let i in this.dropDownItems) {
                this.dropDownItems[i].focused = false
                this.$set(this.dropDownItems, i, this.dropDownItems[i])
            }
            this.dropDownItems[index].focused = true
            this.$set(this.dropDownItems, index, this.dropDownItems[index])
        },
    }
})