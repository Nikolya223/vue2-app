<template>  
    <v-responsive 
        class="tags overflow-x-none" 
        v-intersect="{
            handler: onShow, 
            options: {
                threshold: 1
            }
        }" 
        ref="container" 
    >
        <div class="d-flex flex-nowrap pl-2 pr-2" :class="justify"  v-if="isVisible" v-resize="reDraw" >
            
            <template v-for="(item, index) in tags">
            
                <v-icon class="tags__item_divider mr-3 ml-3" 
                    size="5" 
                    v-if="index > 0 && item.isActive !== false" 
                    :key="index" 
                    :class="item.isActive == null ? 'tags__item_divider--hidden' : '' "
                    
                >mdi-circle</v-icon>  
                
                <div class="tags__item" :key="index + '_'">
                    <div class="tags__item_inner"  
                        v-if="item.isActive !== false" 
                        ref="items" 
                        :class="item.isActive == null ? 'tags__item_inner--hidden' : '' "
                        :data-index="index" 
                    >
                    
                        <v-icon class="mr-2" v-if="item.data.icon" size="20">{{item.data.icon}}</v-icon>
                        <div class="tags__item_title">{{item.data.label}}</div>     
                    </div>
                </div>     
            </template>
             
                   
        </div> 
    </v-responsive>   
  
</template>

<script>   

export default {
    name: 'Tags',  
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        align: {
            type: String,
            validator: function (value) { 
               return ['left', 'justify'].includes(value)
            },
            default: 'left'
        }
    },

    data: () => ({ 
        isVisible: false,
        tags: [],
        justify: '',
    }),
    
    methods: {  
        reDraw() { 
            this.tags.forEach( (item, index) => { 
                if (item.isActive === false) {
                    this.$set(this.tags[index], 'isActive', null);
                } 
            })
            this.$nextTick(() => {  
                this.$refs.items.forEach( (element ) => { 
                    this.observer.observe(element); 
                })
            })
             
        }, 
        onShow(entries) {
            if (entries[0].isIntersecting) {
                this.$set(this, 'isVisible', true); 
                this.reDraw()
            }
        },
        init() {
            this.$set(this, 'tags', []);
            this.items.forEach( item => { 
                this.tags.push({
                    isActive: null,
                    data: item
                })
            })
        }
    },
    
    created() {
        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => { 
                let index = entry.target.dataset.index;  
                this.$set(this.tags[index], 'isActive', entry.isIntersecting);  
                observer.unobserve(entry.target);
                
            }) 
                    
        }, { 
            root: this.$refs.container, 
            threshold: 1
        });  
        this.init();
        
        this.justify = this.align == 'justify' ? 'justify-space-between' : 'justify-start';
    }
}
</script>
<style lang="scss" scoped>
    .tags{
       
       &__item{ 
            &_divider{
                font-size: 13px;
                &--hidden{
                    visibility: hidden;
                }
            } 
            &_inner{
                display: flex;
                flex-direction: row;  
                &--hidden{
                    visibility: hidden;
                }
            }
            &_title{
                white-space: nowrap;
            }
       } 
    }
</style>

