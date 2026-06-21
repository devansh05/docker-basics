docker run -it --name=cont-1 --rm busybox
docker run -itd --name=cont-1 --rm busybox

docker network inspect ls

docker network inspect bridge #inspects default bridge

docker exec marvel ping 172.17.0.2
docker exec container-name ping ip-add (default bridge)

docker network create network-name
docker network create europe

docker run -itd --network=europe --rm --name=germany ngix

docker network inspect europe

docker exec germany ping france

docker network connect europe russia
docker network disconnect europe russia

docker network connect europe india
