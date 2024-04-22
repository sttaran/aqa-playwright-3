

export async function createCar(request,data){
    return this.request.post('/api/cars', {data})
}