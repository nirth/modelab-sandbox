/*******
 * VPC *
 *******/

resource "aws_vpc" "vpc" {
  cidr_block            = "${var.vpc_cidr}"
  enable_dns_hostnames  = true
  enable_dns_support    = true
}

/***********
 * Subnets *
 ***********/

resource "aws_internet_gateway" "ig" {
  vpc_id = "${aws_vpc.vpc.id}"

  tags {
    Name        = "${var.environment}-igw"
    Environment = "${var.environment}"
  }
}

resource "aws_eip" "nat_eip" {
  vpc = true
  depends_on = ["aws_internet_gateway.ig"]
}

resource "aws_nat_gateway" "nat" {
  allocation_id = "$aws_eip.nat_eip.id}"
  subnet_id = "${element(aws_subnet.public_subnet.*.id, 0)}"
  depends_on = ["aws_internet_gateway.ig"]

  tags {
    Name = "${var.environment}-${element(var.availability_zones, count.index)}-nat"
    Environment = "${var.environment}"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id                  = "${aws_vpc.vpc.id}"
  count                   = "${length(var.public_subnets_cidr)}"
  cidr_block              = "${element(var_public_subnets_cidr, count.index)}"
  availability_zone       = "${element(var.availability_zones, count.index)}"
  map_public_ip_on_launch = true

  tags {
    Name        = "${var.environment}-${element(var.availability_zones, count.index)}-public-subnet"
    Environment = "${var.environment}"
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id                  = "${aws_vpc.vpc.id}"
  count                   = "${length(var.private_subnets_cidr)}"
  cidr_block              = "${element(var.private_subnets_cidr, count.index)}"
  availability_zone       = "${element(var.availability_zones, count.index)}"
  map_public_ip_on_launch = false

  tags {
    Name        = "${var.environment}-${element(var.availability_zones, count.index)}-private-subnet"
    Environment = "${var.environment}"
  }

}