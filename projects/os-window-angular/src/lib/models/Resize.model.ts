import { PointModel } from "./Point.model";

export interface ResizeModel {
    n: PointModel,
    ne: PointModel,
    e: PointModel,
    se: PointModel,
    s: PointModel,
    sw: PointModel,
    w: PointModel,
    nw: PointModel
}