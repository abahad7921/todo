<template>
    <!-- <v-card>
        <v-layout>
            <v-navigation-drawer expand-on-hover rail>
                <template v-slot:prepend>
                    <v-list-item lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
                        title="Jane Smith" subtitle="Logged in"></v-list-item>
                </template>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
                    <router-link to="/create"><v-list-item prepend-icon="mdi-account" title="Create" value="create"></v-list-item></router-link>
                    <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="height: 750px"></v-main>
        </v-layout>
    </v-card> -->

    <nav class="navbar">
        <div class="logo">
            <v-img :width="50" aspect-ratio="16/9" cover src="../../assets/logo.svg"></v-img>
        </div>
        <ul class="menu-links">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/create">Create Task</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
        </ul>
    </nav>
</template>

<style scoped>
nav {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 200;
}

.navbar {
    background-color: #f8f8f8;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

.logo img {
    height: 40px;
}

.menu-links {
    list-style-type: none;
    display: flex;
    align-items: center;
    gap: 20px;
}

.menu-links li a {
    text-decoration: none;
    color: #333;
    font-size: 18px;
}
</style>