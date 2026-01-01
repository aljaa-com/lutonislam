import { type RouteConfig, 
    index,
    route,
 } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("donate", "routes/donate.tsx"),
    route("events", "routes/events.tsx"),
    route("classes", "routes/classes.tsx"),
    route("jummah", "routes/jummah.tsx"),
    route("ramadhan", "routes/ramadhan.tsx"),
] satisfies RouteConfig;
