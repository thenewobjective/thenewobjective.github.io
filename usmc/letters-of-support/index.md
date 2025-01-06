---
title: Letters of Support
date:  2019-08-15 12:00:00 -0600
category: USMC
permalink: /usmc/letters-of-support
---

<script setup>
import Galleria from 'primevue/galleria';

const images = Array.from({length: 147}, (_, i) => {
    return {
        src: `/media-library/usmc/letters-of-support/IMG_${i.toString().padStart(4, '0')}.jpg`,
        alt: 'Letter of support',
        caption: `${i} of 147`
    };
});
</script>

I was deployed to Fallujah Iraq during "[Operation Iraqi Freedom](https://en.wikipedia.org/wiki/Iraq_War#2003.3A_Invasion)". During that time I received a large number of letters of support
and [packages](https://beachbums1.com/2006/09/27/%E2%99%AA%E2%99%AA%E2%99%AA-please-please-mr-postman-%E2%99%AA%E2%99%AA%E2%99%AA/) from people across the country. Recently I came to the
conclusion that these letters, while addressed to me, were not for me specifically but for me as a representative of an [archetype](https://stevenpressfield.com/2011/05/the-warrior-archetype/).
I am sharing these in the hope that it provides some perspective, history, and inspiration if you decide to send a letter of support of your own to another service member currently deployed around the world.
It would be appreciated, especially around the holidays.

![Christmas Stockings](/media-library/usmc/stockings-1.jpg "Christmas in Iraq")

<Galleria :value="images">
    <template #item="{item}">
        <a :href="item.src" target="_blank">
            <img :src="item.src" :alt="item.alt" style="height: 4in;" />
        </a>
    </template>
    <template #thumbnail="{item}">
        <img :src="item.src" :alt="item.alt" style="height: 1in" />
    </template>
    <template #caption="{item}">
        {{ item.caption }}
    </template>
</Galleria>
